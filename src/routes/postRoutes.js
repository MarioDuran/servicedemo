import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.patch('/:postId', editPost);
router.delete('/:postId', deletePost);

export default router;