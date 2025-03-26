import User from "@/model/User";
const { Magic } = require("@magic-sdk/admin");
const jwt = require("jsonwebtoken");

const magic = await Magic.init(process.env.MAGIC_SECRET);

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;
  if (!token) {
    return Response.json({ error: "Token is required" });
  }

  const user = await magic.users.getMetadataByToken(token);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // upsert user
  await User.updateOne(
    {
      email: user.email,
    },
    {
      $set: {
        email: user.email,
        username: user.email?.split("@")[0],
      },
    },
    { upsert: true }
  );

  const accessToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return Response.json({
    user: {
      email: user.email,
      username: user.email?.split("@")[0],
      token: accessToken,
    },
  });
}
