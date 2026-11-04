import { expect, test, type Page } from "@playwright/test";

const TITLE =
  "Makuo Ifedike — I build and fix software for small businesses";

const SLUGS = ["interior-deco", "truespec", "athletica", "cp3-legacy"];

function card(page: Page, slug: string) {
  return page.locator(`.work-card[data-project="${slug}"]`);
}

test("1. the home page loads with status 200 and the right title", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(TITLE);
});

test("2. four project cards, Truespec featured and nothing visible for it", async ({
  page,
}) => {
  await page.goto("/");

  for (const slug of SLUGS) {
    await expect(card(page, slug)).toHaveCount(1);
  }
  await expect(page.locator(".work-card")).toHaveCount(SLUGS.length);

  const truespec = card(page, "truespec");
  await expect(truespec).toHaveAttribute("data-featured", "true");
  await expect(truespec).not.toContainText(/featured/i);

  for (const slug of SLUGS.filter((slug) => slug !== "truespec")) {
    await expect(card(page, slug)).not.toHaveAttribute("data-featured", "true");
  }
});

test("3. the orange launcher opens the contact form", async ({ page }) => {
  await page.goto("/");

  const launcher = page.getByRole("button", { name: "Contact Makuo" });
  await launcher.click();

  const dialog = page.locator("#contact-inquiry-dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Tell me what you need" }),
  ).toBeVisible();
});

test("4. an empty submit is blocked by native validation and sends nothing", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/inquiries")) requests.push(request.url());
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Contact Makuo" }).click();

  const dialog = page.locator("#contact-inquiry-dialog");
  const name = dialog.locator('input[name="name"]');

  await dialog.getByRole("button", { name: "Send inquiry" }).click();

  const validity = await name.evaluate((input: HTMLInputElement) => ({
    valid: input.checkValidity(),
    message: input.validationMessage,
    formValid: (input.form as HTMLFormElement | null)?.checkValidity(),
  }));

  expect(validity.valid).toBe(false);
  expect(validity.formValid).toBe(false);
  expect(validity.message.length).toBeGreaterThan(0);

  await page.waitForTimeout(300);
  expect(requests).toEqual([]);
});

test("5. Escape closes the form and focus returns to the launcher", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Contact Makuo" }).click();

  const dialog = page.locator("#contact-inquiry-dialog");
  await expect(dialog).toBeVisible();

  // The launcher focuses the first field a moment after opening.
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(
          document
            .querySelector("#contact-inquiry-dialog")
            ?.contains(document.activeElement),
        ),
      ),
    )
    .toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await expect
    .poll(() =>
      page.evaluate(() => document.activeElement?.id ?? null),
    )
    .toBe("contact-launcher");
});

test("6. no stale domain and no localhost in any project link", async ({
  page,
}) => {
  await page.goto("/");

  const hrefs = await page
    .locator(".work-card a[href]")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href).not.toContain("ifedikemakuo.vercel.app");
    expect(href).not.toContain("localhost");
  }
});

test("7. the Athletica card links to its live site", async ({ page }) => {
  await page.goto("/");

  const links = card(page, "athletica").locator('a[href*="athletica"]');
  await expect(links.first()).toHaveAttribute(
    "href",
    /^https:\/\/athletica-blond\.vercel\.app\/?$/,
  );
});

test("8. the Truespec card links to its live domain", async ({ page }) => {
  await page.goto("/");

  const links = card(page, "truespec").locator('a[href*="truespec"]');
  await expect(links.first()).toHaveAttribute(
    "href",
    /^https:\/\/truespec\.duckdns\.org\/?$/,
  );
});
