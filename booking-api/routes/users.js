import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser } from '../controllers/userController.js';

const router = express.Router()
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

//create new tour
//router.post('/',cr);
//update user

router.put('/:id',verifyUser,updateUser);
//delete  user
router.delete('/:id',verifyUser,deleteUser);
//get single user
router.get('/:id',verifyUser,getSingleUser);
//get all users
router.get('/',verifyAdmin,getAllUsers);
export default router
