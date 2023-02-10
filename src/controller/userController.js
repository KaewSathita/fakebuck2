const cloudinary = require("../utils/cloudinary");

exports.updateUser = async (req, res, next) => {
  try {
    const updateValue = { ...req.body };
    if (req.files.profileImage) {
      const secureUrl = await cloudinary.upload(req.files.profileImage[0].path);
      updateValue.profileImage = secureUrl;
    }

    if (req.files.coverImage) {
      const secureUrl = await cloudinary.upload(req.files.coverImage[0].path);
      updateValue.profileImage = secureUrl;
    }
    await User.update(updateValue, { where: { id: req.user.id } });
    // console.log(req.files);

    res.status(200).json("success");
  } catch (err) {
    next(err);
  }
};
