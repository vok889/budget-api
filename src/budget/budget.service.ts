import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { YearBudgetDto } from './dto/year-budget.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BudgetService {

  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async findYearBudger(year: number) {

    const url = `https://year-budget-api.onrender.com/budget/${year}`
    const headers = {
      'X-Auth-Token': this.configService.get('YEAR_BUDGET_TOKE')
    };

    const { data } = await firstValueFrom(this.httpService.get<YearBudgetDto>(url, { headers }));

    return data
  }
  create(createBudgetDto: CreateBudgetDto) {
    return 'This action adds a new budget';
  }

  findAll() {
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }

  
}
