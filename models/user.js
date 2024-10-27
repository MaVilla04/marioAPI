exports.user = (odm) => {
  const userSchema = new odm.Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      minLength: 10,
      required: true,
      lowercase: true,
    },
  });

  return odm.model("user", userSchema);
};
