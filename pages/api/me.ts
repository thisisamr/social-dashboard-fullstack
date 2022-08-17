import validateRoute from "../../lib/Auth";
export default validateRoute(async (req, res, user) => {
  if (!user) {
    return res.json(null);
  } else {
    return res.json({ ...user });
  }
});
