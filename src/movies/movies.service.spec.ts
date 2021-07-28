import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { exception } from 'console';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

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
});
