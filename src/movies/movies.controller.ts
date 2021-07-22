import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This will return all movies";
    }

    //getOne보다 밑에 있으면 search를 id로 판단하기 때문에 위치 중요
    @Get("search")
    search(@Query('year') searchingYear:string){
        return `we are searching for a movie made after: ${searchingYear}`;
    }

    @Get('/:id')
    getOne(@Param("id") movieId: string){
		//무언가가 필요하면 요청해야 함
        return `This will return one movie with the id : ${movieId}`;
    }

    @Post()
    create(@Body() movieData){
        console.log(movieData);
        return movieData;
        // return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') movieId:string){
        return `This will delete a movie with the id: ${movieId}`;
    }

    //리소스 일부를 지정해서 업데이트 하고 싶을 때 patch, 모든 리소스를 업데이트 할 때는 put
    // @Patch('/:id')
    // patch(@Param('id') movieId:string){
    //     return `This will patch a movie with the id: ${movieId}`;
    // }

    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
	    
        return {
            updatedMovie : movieId,
            ...updateData //object 그대로
        }
    }

    

}   

