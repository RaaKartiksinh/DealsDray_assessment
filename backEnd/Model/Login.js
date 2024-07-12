const mongoose = require("mongoose");

class LoginModel {
  constructor() {
    const schema = new mongoose.Schema(
      {
        // f_sno: { type: Number, default: null },
        f_userName: { type: String, required: true, unique: true },
        f_Pwd: { type: Buffer, required: true },
        salt: { type: Buffer },
      },
      {
        timestamps: true,
      }
    );

    this.model = mongoose.model("t_login", schema);
  }

  create(data) {
    const instance = new this.model(data);
    return instance.save();
  }

  find(query) {
    return this.model.find(query);
  }

  findOne(query) {
    return this.model.findOne(query);
  }

  update(query, data) {
    return this.model.updateOne(query, data);
  }

  delete(query) {
    return this.model.deleteOne(query);
  }
}

module.exports = new LoginModel();
