import { rest } from 'msw';
import { getMockUsers } from '@dpg-code-challenge/data';
export const exhibitionHandlerException = rest.get(
  `${process.env.NX_API_URL}/users`,
  async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Deliberately broken request' })
    );
  }
);
export const handlers = [
  rest.get(`${process.env.NX_API_URL}/users`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit') as string;
    const page = req.url.searchParams.get('page') as string;
    return res(
      ctx.status(200),
      ctx.json({
        ...getMockUsers(+page, +limit),
      })
    );
  }),
];
