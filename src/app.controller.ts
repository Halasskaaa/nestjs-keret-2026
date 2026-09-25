import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { min } from 'rxjs';
import { title } from 'process';

 
@Controller()
export class AppController {
   
  constructor(private readonly appService: AppService) {}
 
  @Get()
  @Render('index')
  getHome() {
    const total = this.appService.getExpenses().reduce((sum, expense) => sum + expense.amount, 0);
    return {
      title: 'Összes kiadás összege', total
    };
  }
 
  @Get('all')
  @Render('all')
  getAll(){
    return{
      title: 'Összes kiadás',
      expenses: this.appService.getExpenses()
    };
  }
 
  @Get('top3')
  @Render('all')
  getTop3(){
    const top3 = [...this.appService.getExpenses()]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
 
    return{
      title: 'Top 3 kiadás',
      expenses : top3
    }
  }

    @Get('search')
    @Render('search')
    search(@Query('name') name?: string){
      const searchTerm = name?.toLowerCase() ?? '';

      const results = this.appService.getExpenses().filter(expense =>
        expense.name.toLowerCase().includes(searchTerm)
      );

      return {
        title: 'Kiadás keresése',
        expenses: results,
        searchTerm: name ?? ''
      }
    }

    @Get('expensive')
    @Render('expensive')
    getExpensive(@Query('amount') amount?: string) {
      const minAmount = Number(amount);

      const results = this.appService.getExpenses().filter(
        expense => expense.amount > minAmount
      );

      return {
        title: 'Drága kiadások',
        expenses: results,
        amount: amount ?? ''
      }
    }

    @Get('stats')
    @Render('stats')
    getStats() {
      const count = this.appService.getExpenses().length;

      const total = this.appService.getExpenses().reduce((sum, expense) => sum + expense.amount, 0);
      
      const average = total / count;

      const categories = [
        'food',
        'utilities',
        'entertainment',
        'misc'
      ] as const;
    
      const categoryStats = categories.map(category => {
        const categoryExpenses = this.appService.getExpenses().filter(expense => {
          return expense.category === category;
        })
        const categoryCount = categoryExpenses.length;

        const categoryTotal = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
          
        const categoryAverage = categoryCount > 0 ? categoryTotal / categoryCount : 0;

        return {
          category,
          count: categoryCount,
          total: categoryTotal,
          average: categoryAverage
        }
    })
    return {
      title: 'Statisztikák',
      count,
      total,
      average,
      categoryStats
    }
  }
}