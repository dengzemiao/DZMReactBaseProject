import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '@/router'
import Pub from '@/utils/public'
import './App.css'

function App() {
  // 初始化测试数据
  useEffect(() => {
    // token
    Pub.ACCESS_TOKEN('bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdC1hcGktcHJveHkuanVoYW9rYW55YS5jb21cL2FwaVwvbG9naW5fY29kZSIsImlhdCI6MTY5NDUwNTUwMSwiZXhwIjoxNjk1MTEwMzAxLCJuYmYiOjE2OTQ1MDU1MDEsImp0aSI6IjFwOHp2dDI0MTdXWFlLNkwiLCJzdWIiOjEwMDAwMDE5OSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.hFWdoRznhjnKx3B4JA1NY-9gfhwxAAUO3cMONpWObD8')
  }, [])
  // 渲染
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
