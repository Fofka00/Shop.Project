import createApp from './index';
import 'dotenv/config';

(async () => {
  const app = await createApp();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
})();