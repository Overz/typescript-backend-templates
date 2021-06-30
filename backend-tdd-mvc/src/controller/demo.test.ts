import request from 'supertest';
import { app } from '../app';
import { demoRepository } from '../models';
import { useData } from '../test/data';

it('deve cadastrar', async () => {
  await useData();

  let demo = await demoRepository.find();

  expect(demo.length).toEqual(1);

  const res = await request(app).post('/api/demo').send({
    nome: 'nome',
    descricao: 'descricao',
  });

  demo = await demoRepository.find();

  expect(demo.length).toEqual(2);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    id: 2,
    nome: 'nome',
    descricao: 'descricao',
  });
});

it('deve listar', async () => {
  await useData();

  const res = await request(app).get('/api/demo');

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(1);
  expect(res.body).toEqual([
    { id: 1, nome: 'demo name', descricao: 'description' },
  ]);
});

it('deve alterar', async () => {
  await useData();

  let demo = await demoRepository.findOne(1);

  expect(demo?.deDescricao).toEqual('description');

  await request(app)
    .put('/api/demo/1')
    .send({
      nome: 'batatinha',
    })
    .expect(204);

  demo = await demoRepository.findOne(1);
  expect(demo?.nmNome).toEqual('batatinha');
});

it('deve lançar erro caso não exista nenhum dado no db', async () => {
  const res = await request(app).put('/api/demo/1');

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ error: 'Nenhum dado encontrado!' });
});

it('deve exibir', async () => {
  await useData();

  const res = await request(app).get('/api/demo/1');

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    id: 1,
    nome: 'demo name',
    descricao: 'description',
  });
});

it('deve deletar', async () => {
  await useData();

  let demo = await demoRepository.find();
  expect(demo.length).toEqual(1);

  const res = await request(app).delete('/api/demo/1');
  demo = await demoRepository.find();

  expect(demo.length).toEqual(0);
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
