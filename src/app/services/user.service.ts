import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../interfaces/user";
import {Window} from "../interfaces/window";
import {Meal} from "../interfaces/meal";
import {Administrator} from "../interfaces/administrator";
import {Order} from "../interfaces/order";
import {Rating} from "../interfaces/rating";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private usersUrl = "http://127.0.0.1:5000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public loginID = ''; //登录状态
  public loginType = ''; //登录身份
  public loginName = ''; //姓名
  public oID = ''; //本次订单ID
  public mID = ''; //本次餐品ID

  //获取所有用户信息的列表
  getUsers():Observable<User[]>{
    const url = `${this.usersUrl}/getusers`; //http://127.0.0.1:5000/getusers
    this.log("已获取用户信息列表！");
    console.log("在浏览器控制台中显示:已获取用户信息列表！");
    return this.http.get<User[]>(url).pipe(
      tap(_=>this.log("获取所有用户的信息！")),//将当前的操作记录在日志中
      catchError(this.handleError<User[]>('getUsers', []))//错误处理
    );
  }
  //获取所有窗口信息的列表
  getWindows():Observable<Window[]>{
    const url = `${this.usersUrl}/getwindows`;
    this.log("已获取窗口信息列表！");
    console.log("在浏览器控制台中显示:已获取窗口信息列表！");
    return this.http.get<Window[]>(url).pipe(
      tap(_=>this.log("获取所有窗口的信息！")),//将当前的操作记录在日志中
      catchError(this.handleError<Window[]>('getWindows', []))//错误处理
    );
  }
  //根据用户ID获取用户信息
  getUserByID(uID: string): Observable<User>{
    const url=`${this.usersUrl}/getuserbyid/${uID}`;
    return this.http.get<User>(url).pipe(
      tap(_=>console.log(`获取ID为${uID}的用户信息！`)),
      catchError(this.handleError<User>(`getUser id=${uID}`))
    );
  }
  //根据窗口ID获取窗口信息
  getWindowByID(wID: string): Observable<Window>{
    const url=`${this.usersUrl}/getwindowbyid/${wID}`;
    return this.http.get<Window>(url).pipe(
      tap(_=>console.log(`获取ID为${wID}的窗口信息！`)),
      catchError(this.handleError<Window>(`getWindow id=${wID}`))
    );
  }
  //根据餐品ID获取餐品信息
  getMealByID(mID: string): Observable<Meal>{
    const url=`${this.usersUrl}/getmealbyid/${mID}`;
    return this.http.get<Meal>(url).pipe(
      tap(_=>console.log(`获取ID为${mID}的餐品信息！`)),
      catchError(this.handleError<Meal>(`getMeal id=${mID}`))
    );
  }
  //根据ID获取管理员信息
  getAdminByID(aID: string): Observable<Administrator>{
    const url=`${this.usersUrl}/getadminbyid/${aID}`;
    return this.http.get<Administrator>(url).pipe(
      tap(_=>console.log(`获取ID为${aID}的管理员信息！`)),
      catchError(this.handleError<Administrator>(`getAdmin id=${aID}`))
    );
  }
  //根据订单ID获取订单信息
  getOrderByID(oID: string): Observable<Order>{
    const url=`${this.usersUrl}/getorderbyid/${oID}`;
    return this.http.get<Order>(url).pipe(
      tap(_=>console.log(`获取ID为${oID}的订单信息！`)),
      catchError(this.handleError<Order>(`getOrder id=${oID}`))
    );
  }
  //修改用户信息
  updateUser(user: User): Observable<any>{
    const url=`${this.usersUrl}/edituser/${user.uID}`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap(_=>this.log(`修改了用户ID为${user.uID}的用户信息`)),
      catchError(this.handleError<any>('updateUser'))
    )
  }
  //修改窗口信息
  updateWindow(window: Window): Observable<any>{
    const url=`${this.usersUrl}/editwindow/${window.wID}`;
    return this.http.post<Window>(url, window, this.httpOptions).pipe(
      tap(_=>this.log(`修改了窗口ID为${window.wID}的窗口信息`)),
      catchError(this.handleError<any>('updateWindow'))
    )
  }
  //修改餐品信息
  updateMeal(meal: Meal): Observable<any>{
    const url=`${this.usersUrl}/editmeal/${meal.mID}`;
    return this.http.post<Meal>(url, meal, this.httpOptions).pipe(
      tap(_=>this.log(`修改了餐品ID为${meal.mID}的餐品信息`)),
      catchError(this.handleError<any>('updateMeal'))
    )
  }
  //修改订单状态
  updateOrder(order: Order): Observable<any>{
    const url=`${this.usersUrl}/editorder/${order.oID}`;
    return this.http.post<Order>(url, order, this.httpOptions).pipe(
      tap(_=>this.log(`修改了订单ID为${order.oID}的订单状态`)),
      catchError(this.handleError<any>('updateOrder'))
    )
  }
  //增加用户信息
  addUser(user: User): Observable<User>{
    const url = `${this.usersUrl}/adduser`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`添加用户信息，ID为${newUser.uID}`)),
      catchError(this.handleError<User>('addUser'))
    )
  }
  //增加窗口信息
  addWindow(window: Window): Observable<Window>{
    const url = `${this.usersUrl}/addwindow`;
    return this.http.post<Window>(url, window, this.httpOptions).pipe(
      tap((newWindow: Window) => this.log(`添加窗口信息，ID为${newWindow.wID}`)),
      catchError(this.handleError<Window>('addWindow'))
    )
  }
  //删除用户信息
  deleteUser(user: User | string): Observable<User>{
    const id = typeof user === 'string' ? user: user.uID;
    const url = `${this.usersUrl}/deleteuser/${id}`;
    return this.http.post<User>(url, this.httpOptions).pipe(
      tap(_=>this.log(`删除ID为${id}的用户信息`)),
      catchError(this.handleError<User>('deleteUser'))
    )
  }
  //删除窗口信息
  deleteWindow(window: Window | string): Observable<Window>{
    const id = typeof window === 'string' ? window: window.wID;
    const url = `${this.usersUrl}/deletewindow/${id}`;
    return this.http.post<Window>(url, this.httpOptions).pipe(
      tap(_=>this.log(`删除ID为${id}的窗口信息`)),
      catchError(this.handleError<Window>('deleteWindow'))
    )
  }
  //获取所有餐品信息的列表
  getMeals(): Observable<Meal[]>{
    const url = `${this.usersUrl}/getmeals`;
    return this.http.get<Meal[]>(url).pipe(
      tap(_=>this.log("获取所有餐品的信息！")),//将当前的操作记录在日志中
      catchError(this.handleError<Meal[]>('getMeals', []))//错误处理
    );
  }
  //获取用户当前订单的列表
  getCurrentOrders(user: User | string): Observable<Order[]>{
    const id = typeof user === 'string' ? user: user.uID;
    const url = `${this.usersUrl}/getcurrentorders/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_=>this.log(`获取ID为${id}的用户当前订单`)),//将当前的操作记录在日志中
      catchError(this.handleError<Order[]>('getCurrentOrders', []))//错误处理
    );
  }
  //获取窗口当前订单的列表
  getReceivedOrders(window: Window | string): Observable<Order[]>{
    const id = typeof window === 'string' ? window: window.wID;
    const url = `${this.usersUrl}/getreceivedorders/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_=>this.log(`获取ID为${id}的窗口当前订单`)),//将当前的操作记录在日志中
      catchError(this.handleError<Order[]>('getReceivedOrders', []))//错误处理
    );
  }
  //获取窗口餐品的列表
  getWindowMeals(window: Window | string): Observable<Meal[]>{
    const id = typeof window === 'string' ? window: window.wID;
    const url = `${this.usersUrl}/getwindowmeals/${id}`;
    return this.http.get<Meal[]>(url).pipe(
      tap(_=>this.log(`获取ID为${id}的窗口餐品列表`)),//将当前的操作记录在日志中
      catchError(this.handleError<Meal[]>('getWindowMeals', []))//错误处理
    );
  }
  //增加餐品信息
  addMeal(meal: Meal): Observable<Meal>{
    const url = `${this.usersUrl}/addmeal`;
    return this.http.post<Meal>(url, meal, this.httpOptions).pipe(
      tap((newMeal: Meal) => this.log(`添加餐品信息，名称为${newMeal.mName}`)),
      catchError(this.handleError<Meal>('addMeal'))
    )
  }
  //删除餐品信息
  deleteMeal(meal: Meal | string): Observable<Meal>{
    const mID = typeof meal === 'string' ? meal: meal.mID;
    const url = `${this.usersUrl}/deletemeal/${mID}`;
    return this.http.post<Meal>(url, this.httpOptions).pipe(
      tap(_=>this.log(`删除ID为${mID}的餐品信息`)),
      catchError(this.handleError<Meal>('deleteMeal'))
    )
  }
  //用户登录
  login(loginUser: User): Observable<string>{
    const url = `${this.usersUrl}/login`;
    return this.http.post<string>(url, loginUser, this.httpOptions).pipe(
      tap(_=>this.log(`ID为${loginUser.uID}的用户尝试登录！`)),//将当前的操作记录在日志中
      catchError(this.handleError<string>('login', '0'))//错误处理
    );
  }
  //窗口登录
  windowLogin(loginWindow: Window): Observable<string>{
    const url = `${this.usersUrl}/windowlogin`;
    return this.http.post<string>(url, loginWindow, this.httpOptions).pipe(
      tap(_=>this.log(`ID为${loginWindow.wID}的窗口尝试登录！`)),//将当前的操作记录在日志中
      catchError(this.handleError<string>('windowLogin', '0'))//错误处理
    );
  }
  //管理员登录
  adminLogin(loginAdmin: Administrator): Observable<string>{
    const url = `${this.usersUrl}/adminlogin`;
    return this.http.post<string>(url, loginAdmin, this.httpOptions).pipe(
      tap(_=>this.log(`ID为${loginAdmin.aID}的管理员尝试登录！`)),//将当前的操作记录在日志中
      catchError(this.handleError<string>('adminLogin', '0'))//错误处理
    );
  }
  //订餐
  order(orderMessage: Order): Observable<string>{
    const url = `${this.usersUrl}/order`;
    return this.http.post<string>(url, orderMessage, this.httpOptions).pipe(
      tap(_=>this.log(`ID为${orderMessage.uID}的用户进行餐品ID为${orderMessage.mID}的餐品的预订！`)),
      catchError(this.handleError<string>('order', '0'))//错误处理
    );
  }
  //查询订单
  searchOrder(uID: string): Observable<string>{
    const url = `${this.usersUrl}/searchorders/${uID}`;
    return this.http.get<string>(url).pipe(
      tap(_=>this.log(`查询ID为${uID}的学生的订单！`)),
      catchError(this.handleError<string>('searchRsv', '0'))//错误处理
    );
  }
  //取消订单
  cancelOrder(oID: string): Observable<string>{
    const url = `${this.usersUrl}/cancelorder/${oID}`;
    return this.http.post<string>(url, this.httpOptions).pipe(
      tap(_=>this.log(`取消ID为${oID}的订单！`)),
      catchError(this.handleError<string>('cancelOrder', '0'))//错误处理
    );
  }
  //接收订单
  checkOrder(oID: string): Observable<string>{
    const url = `${this.usersUrl}/checkorder/${oID}`;
    return this.http.post<string>(url, this.httpOptions).pipe(
      tap(_=>this.log(`接收ID为${oID}的订单！`)),
      catchError(this.handleError<string>('checkOrder', '0'))//错误处理
    );
  }
  //订单备好
  cookOrder(oID: string): Observable<string>{
    const url = `${this.usersUrl}/cookorder/${oID}`;
    return this.http.post<string>(url, this.httpOptions).pipe(
      tap(_=>this.log(`准备完毕ID为${oID}的订单！`)),
      catchError(this.handleError<string>('cookOrder', '0'))//错误处理
    );
  }
  //完成订单
  finishOrder(oID: string): Observable<string>{
    const url = `${this.usersUrl}/finishorder/${oID}`;
    return this.http.post<string>(url, this.httpOptions).pipe(
      tap(_=>this.log(`完成ID为${oID}的订单！`)),
      catchError(this.handleError<string>('finishOrder', '0'))//错误处理
    );
  }
  //获取订单信息
  getOrders(): Observable<Order[]>{
    const url = `${this.usersUrl}/getorders`;
    this.log("已获取订单信息列表！");
    console.log("在浏览器控制台中显示:已获取订单信息列表！");
    return this.http.get<Order[]>(url).pipe(
      tap(_=>this.log("获取所有订单信息！")),
      catchError(this.handleError<Order[]>('getOrders', []))//错误处理
    );
  }
  //获取用户历史订单信息
  getUserOrders(user: User | string): Observable<Order[]>{
    const id = typeof user === 'string' ? user: user.uID;
    const url = `${this.usersUrl}/getuserorders/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_=>this.log(`获取ID为${id}用户的历史订单信息！`)),
      catchError(this.handleError<Order[]>('getUserOrders', []))//错误处理
    );
  }
  //获取窗口历史订单信息
  getWindowOrders(window: Window | string): Observable<Order[]>{
    const id = typeof window === 'string' ? window: window.wID;
    const url = `${this.usersUrl}/getwindoworders/${id}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_=>this.log(`获取ID为${id}窗口的历史订单信息！`)),
      catchError(this.handleError<Order[]>('getWindowOrders', []))//错误处理
    );
  }
  //删除订单信息
  deleteOrder(order: Order | string): Observable<Order>{
    const id = typeof order === 'string' ? order: order.oID;
    const url = `${this.usersUrl}/deleteorder/${id}`;
    return this.http.post<Order>(url, this.httpOptions).pipe(
      tap(_=>this.log(`删除ID为${id}的订单信息`)),
      catchError(this.handleError<Order>('deleteOrder'))
    )
  }
  //获取所有评分信息的列表
  getRatings(): Observable<Rating[]>{
    const url = `${this.usersUrl}/getratings`;
    return this.http.get<Rating[]>(url).pipe(
      tap(_=>this.log("获取所有评分的信息！")),//将当前的操作记录在日志中
      catchError(this.handleError<Rating[]>('getRatings', []))//错误处理
    );
  }
  //查询评分
  searchRating(uID: string, mID: string): Observable<number>{
    const url = `${this.usersUrl}/searchrating/${uID}/${mID}`;
    return this.http.get<number>(url).pipe(
      tap(_=>this.log(`查询用户ID为${uID},餐品ID为${mID}的评分！`)),
      catchError(this.handleError<number>('searchRating', 0))//错误处理
    );
  }
  //评分
  rate(rating: Rating): Observable<Rating>{
    const url = `${this.usersUrl}/rate`;
    return this.http.post<Rating>(url, rating, this.httpOptions).pipe(
      tap((newRating: Rating) => this.log(`添加评分信息，用户ID:${newRating.uID}，餐品ID:${newRating.mID}，评分:${newRating.rating}`)),
      catchError(this.handleError<Rating>('rate'))
    )
  }
  //获取推荐餐品信息的列表
  recommend(uID: string): Observable<Meal[]>{
    const url = `${this.usersUrl}/recommend/${uID}`;
    return this.http.get<Meal[]>(url).pipe(
      tap(_=>this.log("获取推荐餐品的信息！")),//将当前的操作记录在日志中
      catchError(this.handleError<Meal[]>('recommend', []))//错误处理
    );
  }

  private log(message: string){
    this.messageService.add(`StudentService:${message}`)
  }

  private handleError<T>(operation='operation', result?: T){
    return (error: any): Observable<T> => {
      //在浏览器控制台中输出错误
      console.log(error);
      //向消息服务中推送错误信息
      this.log(`${operation} failed:${error.message}`);
      //返回默认值
      return of(result as T);
    }
  }
}
