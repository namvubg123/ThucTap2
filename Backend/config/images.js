const cloudinary = require("../config/cloudinary");

const images = {
  uploadImages: async (req, res) => {
    try {
      const images = req.files.map((file) => file.path);

      const uploadedImages = await Promise.all(
        images.map((image) => cloudinary.uploader.upload(image))
      );

      return res.status(200).json({ uploadedImages });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};

module.exports = images;
