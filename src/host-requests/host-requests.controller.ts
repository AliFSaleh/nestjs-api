import { Controller, Get, Param, ParseFilePipe, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { HostRequestsService } from './host-requests.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnumType } from 'src/users/entity/users.entity';
import { SearchHostRequestsDto } from './dto';

@Controller('api/host-requests')
export class HostRequestsController {
    constructor (
        private hostRequestsService: HostRequestsService
    ) {}

    @UseGuards(AuthGuard)
    @Get('/')
    getRequests (
        @Query() query: SearchHostRequestsDto,
        @Req() req,
    ) {        
        const user = req.user

        let {userId, status} = query
        if(user.role === RoleEnumType.USER)
            userId = user.sub
        
        return this.hostRequestsService.findRequests(userId, status)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.USER)
    @Post('/')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async createRequest(
        @UploadedFile(new ParseFilePipe({validators: []}))
        file: Express.Multer.File,
        @Req() req
    ){
        return this.hostRequestsService.createRequest(req.user.sub, file)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.ADMIN)
    @Post('/confirm')
    confirmRequest(
        @Query('hostRequestId') hostRequestId: number
    ) {
        return this.hostRequestsService.confirmRequest(hostRequestId)
    }

    @UseGuards(AuthGuard)
    @Roles(RoleEnumType.ADMIN)
    @Post('/reject')
    rejectRequest(
        @Query('hostRequestId') hostRequestId: number
    ) {
        return this.hostRequestsService.rejectRequest(hostRequestId)
    }
}
