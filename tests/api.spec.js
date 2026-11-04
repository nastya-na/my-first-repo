
import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {
    const baseURL = 'https://restful-booker.herokuapp.com';

    test ('Получение списка ID бронирований', async ({ request }) => {

        // Отправляем GET-запрос
        const response = await request.get(`${baseURL}/booking`);

        // Проверка 1: Статус-код ответа
        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        // Проверка 2: Тело ответа не пустое
        const responseBody = await response.json();
        console.log('Тело ответа:', responseBody);
        expect(responseBody.length).toBeGreaterThan(0);

        // Проверка 3: В ответе есть объекты с ключом 'bookingid'
        expect(responseBody[0]).toHaveProperty('bookingid');
        
    });



    // п.1 Создание бронирования (Create - POST)
    test ('Создание бронирования', async ({ request }) => {

        // присваиваю константе данные
        const postData = {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
        };

        // ●	Отправьте POST запрос на эндпоинт /booking
        const responsePost = await request.post(`${baseURL}/booking`, {
            data: postData
        });
              
        // ○	Статус-код ответа равен 200 OK.
        console.log(`Status-code: ${responsePost.status()}`);
        expect(responsePost.status()).toBe(200);

        // ○	В ответе (response body) содержится bookingid.
        const body = await responsePost.json();
        
        // временное для вывода тела и понимания
        console.log(body);

        expect(body).toHaveProperty('bookingid');

        // ○	В ответе возвращаются те же данные, которые вы отправляли в запросе (имя, фамилия, цена и т.д.).
        
        expect(body.booking).toMatchObject(postData);
    
    });


    // 2. Получение информации о бронировании (Read - GET)
    test ('Получение информации о бронировании', async ({ request }) => {
       // ○	Данные в ответе (имя, фамилия и т.д.) соответствуют данным, созданным в первом тесте.
        const postData = {
              "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };
                     
            
        // ●	Отправьте POST запрос на эндпоинт /booking
        const responsePost = await request.post(`${baseURL}/booking`, {
            data: postData
        });
        const postInfo = await responsePost.json();
        const id = postInfo.bookingid;



        // ●	Используйте bookingid, полученный в первом тесте. ----- Я прогнала тест, увидела в теле запроса свой номер ИД = 607, он действующий


            // ●	Отправьте GET запрос на эндпоинт /booking/{id}.
        const response = await request.get(`${baseURL}/booking/${id}`);

            // TEST CHECK 
            // ○	Статус-код ответа равен 200 OK.
        console.log("Response status:", response.status());
        expect(response.status()).toBe(200);

           
    
        const body = await response.json();
        expect(body).toMatchObject(postData);          

        


    });




    // 3. Обновление бронирования (Update - PUT)
    test ('3. Обновление бронирования', async ({ request }) => {
        const postData = {
              "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };

        const responsePost = await request.post(`${baseURL}/booking`, {
            data: postData
        });

    
        const postInfo = await responsePost.json();
        const id = postInfo.bookingid;


        // ●	Вам понадобится токен авторизации. Для его получения отправьте 
        // POST запрос на эндпоинт /auth с данными username: 
        // "admin" и password: "password123".
        const responseAuth = await request.post(`${baseURL}/auth`, {
            data: {
            "username" : "admin",
            "password" : "password123"
            }
        });

        const auth = await responseAuth.json();
        const token = auth.token;

        console.log("ТОКЕН:", token);


        // ●	Отправьте PUT запрос на эндпоинт /booking/{id}, 
        // передав в заголовке Cookie полученный токен (например, Cookie: token=...).
        // ●	В теле запроса передайте обновленные данные (например, измените имя и цену).
        const responsePut = await request.put(`${baseURL}/booking/${id}`, {
            headers: {Cookie: `token=${token}` },
            data: {
            "firstname" : "Tom",
            "lastname" : "Brown",
            "totalprice" : 222,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        
        }
        });




        // TEST CHECK
        expect(responsePut.status()).toBe(200);

        const a = await responsePut.json();
        expect(a).toMatchObject({"firstname" : "Tom",
            "lastname" : "Brown",
            "totalprice" : 222,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"});
        

    });



    // 4. Удаление бронирования (Delete - DELETE)
    test ('4. Удаление бронирования', async ({ request }) => {
        const postData = {
              "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };


        // create ID
        const responsePost = await request.post(`${baseURL}/booking`, {
            data: postData
        }); 
        const postInfo = await responsePost.json();
        const id = postInfo.bookingid;


        // POST запрос на эндпоинт /auth с данными username: 
        // "admin" и password: "password123".
        const responseAuth = await request.post(`${baseURL}/auth`, {
            data: {
            "username" : "admin",
            "password" : "password123"
            }
        });
        const auth = await responseAuth.json();
        const token = auth.token;


        // ●	Отправьте DELETE запрос на эндпоинт /booking/{id},
        //  передав в заголовке Cookie токен.
        const responseDelete = await request.delete(`${baseURL}/booking/${id}`, {
            headers: { Cookie: `token=${token}`
            }
        });


        // TESTS CHECK
        expect(responseDelete.status()).toBe(201);

        const responseGet = await request.get(`${baseURL}/booking/${id}`);
        expect(responseGet.status()).toBe(404);







    });

   
});







