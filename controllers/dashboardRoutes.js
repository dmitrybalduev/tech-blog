const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id', 'name', 'content', 'created_at'
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/new', (req, res) => {
    res.render('newpost');
});

module.exports = router;