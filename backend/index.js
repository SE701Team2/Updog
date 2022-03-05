import server from './server';
import db from './config/database';
import { PORT } from './config/config';

db.sync().then(() => {
  server.listen(PORT, () => console.log(`server is running at ${PORT}`));
});
