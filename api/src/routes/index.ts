import { UserControl } from '@api/controls';
import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

router.get('/user/list', middlewares.session(), (req, res) => {
  const ctrl = new UserControl(req, res);
  ctrl.getUserList();
});

router.get('/user/profile', middlewares.session(), (req, res) => {
  const ctrl = new UserControl(req, res);
  ctrl.getUserById();
});
router.post('/user/profile', middlewares.session(), (req, res) => {
  const ctrl = new UserControl(req, res);
  ctrl.createUser();
});
router.put('/user/profile', middlewares.session(), (req, res) => {
  const ctrl = new UserControl(req, res);
  ctrl.updateUser();
});
router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

export default router;
