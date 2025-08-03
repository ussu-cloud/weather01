// Получаем элементы со страницы
const input = document.querySelector('.weather__input')
const btn = document.querySelector('.weather__btn')
const result = document.querySelector('.weather__result')

// Обработка клика по кнопке
btn.addEventListener('click', async (event) => {
  event.preventDefault()

  const apiKey = config.apiKey;
  const city = input.value.trim()
  // собираем URL запроса с нужными параметрами
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`

  try {
    // Отправляем запрос к API и ждём ответ
    const response = await fetch(url)

    // Если ошибка (например, город не найден), выбрасываем исключение
    if (!response.ok) {
      throw new Error('Сервер вернул ошибку')
    }

    // Преобразуем ответ в формат JSON
    const data = await response.json()

    // Извлекаем нужные данные: температура и описание погоды
    const temp = Math.round(data.main.temp)
    const description = data.weather[0].description

    // Показываем результат пользователю
    result.textContent = `Температура: ${temp}°C, ${description}`
  } catch (error) {
    // Если произошла ошибка (например, плохой интернет или город не найден), показываем сообщение
    result.textContent = 'Ошибка: не удалось получить данные'
  }
})