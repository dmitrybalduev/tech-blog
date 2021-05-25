const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include:{
        model: User,
        model: Comment
      }
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id', 'content', 'name', 'created_at'],
          include: [{
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
        // console.log(JSON(postData));
          if (!postData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = postData.get({ plain: true });
          res.render('onePost', { post, loggedIn: true });
          // res.json(postData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      name: req.body.name,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update({
          name: req.body.name,
          content: req.body.content
      }, {
          where: {
              id: req.params.id
          }
      }).then(data => {
          if (!data) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(data);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
