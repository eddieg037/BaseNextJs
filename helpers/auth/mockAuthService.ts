export const MOCK_ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin",
} as const;

const MOCK_DELAY_IN_MS = 600;

export type MockLoginRequest = {
  username: string;
  password: string;
};

export type MockLoginSuccess = {
  user: {
    username: string;
    role: "admin";
  };
  token: string;
};

export async function mockLogin(
  request: MockLoginRequest,
): Promise<MockLoginSuccess> {
  const normalizedUsername = request.username.trim().toLowerCase();
  const normalizedPassword = request.password.trim();

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_IN_MS));

  if (
    normalizedUsername === MOCK_ADMIN_CREDENTIALS.username &&
    normalizedPassword === MOCK_ADMIN_CREDENTIALS.password
  ) {
    return {
      user: {
        username: MOCK_ADMIN_CREDENTIALS.username,
        role: "admin",
      },
      token: "mock-admin-token",
    };
  }

  throw new Error("Invalid username or password.");
}
