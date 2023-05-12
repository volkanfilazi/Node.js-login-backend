const router = require("express").Router()
const { createUser, getUsers, deleteUser, updateUser, getSingleUser, login, currentUser } = require("../controllers/userController")

router.route("/register")
.get(getUsers)
.post(createUser)

router.route("/login")
.post(login)

router.route("/currentuser")
.get(currentUser)

router.route("/:id")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router