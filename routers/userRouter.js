const router = require("express").Router()
const { createUser, getUsers, deleteUser, updateUser, getSingleUser } = require("../controllers/userController")

router.route("/register")
.get(getUsers)
.post(createUser)

router.route("/:id")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router