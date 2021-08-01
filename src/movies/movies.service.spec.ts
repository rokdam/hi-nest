import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Console, exception } from 'console';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //각 함수가 실행되기 전 행동
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  //beforeEach,afterEach, beforeAll, afterAll등의 많은 Hook 함수가 있음

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {

    it('should return an array', () =>{
      //service에 접근 가능
      const result = service.getAll();
      //타입이 배열인 지 확인해볼 것
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {

    it('should return a movie', () =>{
       //movie 생성
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      //service에 접근 가능
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () =>{
      //try catch로 404에러 뜨는 지 확인
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('movie with id 999 Not Found');
      }
    });

  });

  //삭제 테스트 작성
  describe("deleteOne", ()=>{
    it("deletes a movie", () =>{
      //먼저 movie를 생성해야 하니 create 해 줌
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length; //1
      //삭제
      service.deleteOne(1);
      //삭제 후 확인
      const afterDelete = service.getAll().length; //0

      //allMovies에 비해 afterDelete가 작을것을 기대함
      expect(afterDelete).toBeLessThan(allMovies);
    });

    //이상한 값을 지우면 404를 리턴함
    it("should return a 404", ()=>{
      try{
        service.deleteOne(9999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  

  //create 테스트 작성
  describe("create", ()=>{
    it("should create a Movie", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const afterCreate =service.getAll().length;
      //console log도 다르게 보여줌
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);

    });  
  })

  describe('update', () =>{
    it('should update a movie', () => {
      //만약 여기서 service.create를 복붙하고 싶지 않으면 beforeEach에 movie를 생성해도 됨
      //movie를 생성하는 코드는 지금 모든 테스트함수에서 동일하므로
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      service.update(1, {
        title:"Updated Test"
      });
      const movie = service.getOne(1);
      
      expect(movie.title).toEqual("Updated Test");
    });

    it('should throw a NotFoundException', ()=>{
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

