const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "STORE"];
exports.member_status_enums = ["ONPOUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];
exports.product_collection_enums =  ["power-saws", "drills", "grinders", "machine-tools", "air-tools", "ect"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["normal",  "large", "small", "set"];

exports.oreder_status_enums =  ["PAUSED", "PROCESS", "FINISHED", "DELETED"];
exports.like_view_group_list =["product", "member", "community"];
exports.board_id_enum_list =["celebrity", "evaluation", "story"];

exports.board_article_status_enum_list =["active", "deleted"];


/********************************************
 * MONGODB RELATED COMMANDS   *
 *
 ***************************************/

exports.shapeIntoMongooseObjectId = (target) => {
    if (typeof target === "string") {
        return new mongoose.Types.ObjectId(target);
    } else return target;
};