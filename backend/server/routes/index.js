import { Router } from 'express';
const router = Router();

import { user, test} from '../controllers';

router
  .route('/users')
  .post(user.addUser)
  .get(user.getUsers);

router.route('/users/:id').get(user.getUsersById);

router.route('/test').get(test.helloWorld)

router.route('/users/authenticate').post(user.authenticateUser);

export default router;
