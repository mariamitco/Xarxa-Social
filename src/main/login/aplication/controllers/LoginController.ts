import LoginAdapter from '../adapters/LoginAdapter';
import { Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { ErrorMessages, HandledError } from '../../../shared/domain/models/HandledError';

@autoInjectable()
export default class LoginController {
  adapter: LoginAdapter;
  router: Router;

  constructor(adapter: LoginAdapter) {
    this.adapter = adapter;
    this.router = Router();
  }

  routes() {
    this.router.get('/', async (req, res) => {
      try {
        validateLoginRequest(req);
      } catch (e) {
        res.status((e as HandledError).responseStatus!).send(({
          error: (e as HandledError).message,
          resolution: (e as HandledError).resolution
        }));
        return;
      }
      try {
        await this.adapter.adapt(req.body.email, req.body.password)
          .then(val => {
            res.status(200).send(val);
          }
          );
      } catch (e) {
        res.status((e as HandledError).responseStatus == undefined ? 500 : (e as HandledError).responseStatus!).send({
          error: (e as HandledError).responseStatus == undefined ? "internal server error." : (e as HandledError).message,
          resolution: (e as HandledError).responseStatus == undefined ? "" : (e as HandledError).resolution
        });
      }
    });
    return this.router;
  }
}

function validateLoginRequest(req: any) {
  if (req.body.email == null || req.body.password == null) {
    throw new HandledError(ErrorMessages.RequestBodyError, "send expected parameters", 400);
  }
}
