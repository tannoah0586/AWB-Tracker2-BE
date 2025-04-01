const express = require('express');
const router = express.Router();
const savedAwbController = require('../controllers/savedAwbController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, savedAwbController.saveAwb);
router.put('/', verifyToken, savedAwbController.updateSavedAwb); 
router.get('/',verifyToken,savedAwbController.getUserSavedAwbs)
router.delete('/:savedAwbId',verifyToken, savedAwbController.deleteSavedAwbs);

module.exports = router;