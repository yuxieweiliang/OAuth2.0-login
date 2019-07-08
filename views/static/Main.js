import React from 'react';
import itemImage from'./img/item.jpg'
import logo from './img/logo.png'
import user from './img/user.png'
import qq from './img/QQ.png'
import wx from './img/wx.png'
import './main.css';
const links = [
    {
        title: '关于我们',
        data: [
            {
                href: '/not-found',
                target: '_blank',
                text: '艾森简介'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '社区公约'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '使用条款'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '加入我们'
            }
        ]
    },

    {
        title: '帮助反馈',
        data: [
            {
                href: '/not-found',
                target: '_blank',
                text: '意见反馈'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '帮助中心'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '联系我们'
            }
        ]
    },

    {
        title: '编程教学',
        data: [
            {
                href: '/not-found',
                target: '_blank',
                text: '资源中心1'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: '资源中心2'
            },
            {
                href: '/download',
                target: '_blank',
                text: '下载中心'
            }
        ]
    },

    {
        title: '友情链接',
        data: [
            {
                href: '/not-found',
                target: '_blank',
                text: '智慧课堂'
            },
            {
                href: '/not-found',
                target: '_blank',
                text: 'xxx产品'
            }
        ]
    }
];
const TodoList =['33333','33333','33333','33333','33333','33333','33333']
class Main extends React.Component{
    state={
        modalIsOpen:'none',
        atUserItems:false,
    }
    handleMouseOver=(e)=>{
        this.setState({
            modalIsOpen: 'block',
        })
    }
    handleMouseOut=()=>{

        this.setState({
            modalIsOpen: 'none',
        })

    }
    handleMouseUserOver=()=>{
        this.setState({
            modalIsOpen: 'block',
        })
    }
    userCenter=()=>{
        this.setState({
            modalIsOpen: 'none',
        })
    }
    render(){

        return(
            <div>
            <div className="container">
                <div className="wrap">
                    <div className="header">
                        <img src={logo}/>
                        <div
                             onMouseOver={this.handleMouseOver}
                             onMouseLeave={this.handleMouseOut}
                        ><img src={user}/></div>
                        <div className='menus'
                             style={{display:this.state.modalIsOpen}}
                             onMouseOver={this.handleMouseUserOver}
                             onMouseLeave={this.handleMouseOut}
                        >
                            <ul className='ul'>
                                <li className='li' onClick={this.userCenter}>个人中心</li>
                                <li className='li' >账号设置</li>
                                <li className='li' >注销</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='items'>
                {TodoList.map((item,index)=>
                    <a className='item' href='#' key={index}><img src={itemImage} /></a>
                )}
                </div>
                <div className= 'footer'>
                    <div className="footer-top">
                        <div className='footer-left'>
                            <div className='contact'><img src={wx}/><p>微信服务号</p></div>
                            <div className='contact'><img src={qq}/><p>15423652</p></div>

                        </div>
                        <div className='footer-right'>

                            {
                                links.map((block, idx) => {
                                    return (
                                        <dl className='link-box' key={idx}>
                                            <dt className='title'>{block.title}</dt>
                                            {block.data.map((item, idx1) => {
                                                return (
                                                    <dd className='link' key={idx1}>
                                                        <a href={item.href} target={item.target}>{item.text}</a>
                                                    </dd>
                                                );
                                            })}
                                        </dl>
                                    );
                                })
                            }
                            <dl className='link-box' >
                                <dt className='title'>语言切换</dt>
                                <dd className='link'>

                                </dd>
                            </dl>
                        </div>
                    </div>
                    <hr/>
                    <div className="footer-bottom">
                        <p>©2018 艾森智能 版权所有</p>
                    </div>
                </div>
            </div>

            </div>
        )


    }


}
export default Main;
