import { query } from '../db.js';

export const createPost = async (req, res) => {
  const { content } = req.body;

  try {
    const insertPostQuery = `
      INSERT INTO posts (content)
      VALUES ($1)
      RETURNING id, content, created_at;
    `;

    const result = await query(insertPostQuery, [content]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const getPostsQuery = `
      SELECT id, content, created_at
      FROM posts
      ORDER BY created_at DESC;
    `;

    const result = await query(getPostsQuery);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const getPostQuery = `
      SELECT id, content, created_at
      FROM posts
      WHERE id = $1;
    `;

    const result = await query(getPostQuery, [postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const updatePostQuery = `
      UPDATE posts
      SET content = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, content, updated_at;
    `;

    const result = await query(updatePostQuery, [content, postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletePostQuery = `
      DELETE FROM posts WHERE id = $1;
    `;

    const result = await query(deletePostQuery, [postId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};