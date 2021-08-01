import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  //테스트를 진행할 때마다 새로운 어플리케이션이 생성되는 걸 원치 않음
  //하지만 테스트 진행중에 movies는 기억하고 싶음
  //beforeEach ->beforeAll로 변경
  beforeAll(async () => {
    //실제 서비스에서 생성하는 어플리케이션과는 다른 어플리케이션임
    //테스트를 위한 어플리케이션
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //실제 어플리케이션과 동일한 환경을 만들어주기 위해 추가
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, //값이 맞지 않으면 리퀘스트를 막아버림
        transform: true //url은 기본적으로 string인데 실제 타입으로 바꿔줌
      }),
    );
    await app.init();

  });

  it('/app (GET)', () => {
    return request(app.getHttpServer())
      .get('/app')
      .expect(200)
      .expect('Welcome to my movie api');
  });

  //movies의 get,post,delete 모두 테스트함
  describe("/movies", () =>{
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });

    //post로 movie 생성
    it('POST 201', ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title : 'Test',
        year: 2000,
        genres : ['test'],
      })
      .expect(201) //생성 성공코드
    })

    //잘못된 걸 create하는지를 확인
    it('POST 400', ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title : 'Test',
        year: 2000,
        genres : ['test'],
        other: "Thing"
      })
      .expect(400) //validation이 잘못된 요청으로 400 리턴할것임
    })

    it("DELETE", () =>{
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404) //NotFound
    })
  });

  describe('/movies/:id', ()=>{
    // it.todo('GET');
    it('GET 200', ()=>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    });

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });

    //update
    it("PATCH 200 ", ()=>{
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title : "Updated TEst"})
      .expect(200)
    })
    // it.todo('PATCH');메모같은거
    // it.todo('DELETE'); 
    
    //삭제
    it("DELETE 200", ()=>{
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    })
    
  });
});
