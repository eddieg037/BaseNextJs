import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { mockLogin, MOCK_ADMIN_CREDENTIALS } from "../helpers/auth/mockAuthService";

describe("mockLogin", () => {
  test("resolves with admin session when credentials match", async () => {
    const result = await mockLogin({
      username: MOCK_ADMIN_CREDENTIALS.username,
      password: MOCK_ADMIN_CREDENTIALS.password,
    });

    assert.deepEqual(result, {
      user: { username: MOCK_ADMIN_CREDENTIALS.username, role: "admin" },
      token: "mock-admin-token",
    });
  });

  test("trims and normalizes the incoming credentials", async () => {
    const result = await mockLogin({ username: " ADMIN ", password: " admin " });

    assert.equal(result.user.username, MOCK_ADMIN_CREDENTIALS.username);
    assert.equal(result.token, "mock-admin-token");
  });

  test("rejects with an error when credentials are invalid", async () => {
    await assert.rejects(
      () => mockLogin({ username: "wrong", password: "credentials" }),
      /Invalid username or password/,
    );
  });
});
