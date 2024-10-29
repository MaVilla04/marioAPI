exports.user = (odm) => {
  const userSchema = new odm.Schema({
    name: { type: String, required: true },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
  });

  return odm.model("user", userSchema);
};
