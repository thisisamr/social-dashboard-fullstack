import validateRoute from "../../lib/Auth";
export default validateRoute(async (req, res, user) => {
  res.json({ ...user });
});
