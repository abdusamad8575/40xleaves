import React,{useState,useEffect} from 'react';
import axiosInstance from '../axios'
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { ServerURL } from '../services/baseUrl';

const Blogs = () => {
  const [blog,setBlog] = useState([])

let urlQuery = '';

  useEffect(()=>{

    urlQuery=`/api/v1/blogs`

    const fetchData = async()=>{

      try {

        const response = await axiosInstance.get(urlQuery);
        setBlog(response.data.data)
        console.log(response.data.data)
        
      } catch (error) {
        console.log(error)
      }

    }


    fetchData()


  },[])

  //date format
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return `${formattedDate} `;
  };
  
  


  // Dummy data for demonstration
  const blogs = [
    {
      id: 1,
      title: 'Blog Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel erat vitae nisi consectetur tempus.',
      author: 'John Doe',
      date: 'April 25, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    {
      id: 2,
      title: 'Blog Title 2',
      content: 'Nullam ac nisi vitae nulla congue aliquet. Curabitur quis sem id ipsum rutrum consectetur.',
      author: 'Jane Smith',
      date: 'April 26, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1483996887144-ede479a83102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjh8MjEwMDExNXx8ZW58MHx8fHx8'
    },
    // Add more blog objects as needed
  ];

  return (
    <>
      <TopNav/>
     <MiddleNav/>
     <MainNav/> 
      <div className="container py-5">
        <h2 className="mb-4 text-center">Blogs</h2>
        <div className="row">
          {blog.map(item => (
            <div className="col-lg-6 mb-4" key={item._id}>
              <div className="card border-0 shadow">
                <img src={`${ServerURL}/uploads/${item.image}`} className="card-img-top" alt={item.title} style={{width:'100%', height:'400px', objectFit:'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><small className="text-muted">By Microgreen on {formatDate(item.createdAt)}</small></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Blogs;
