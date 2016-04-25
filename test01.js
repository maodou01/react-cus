/*修改密码*/
var Section_exit_password=React.createClass({
    handleClick: function(){
        var bool=true;
        for(var name in this.refs){
            //console.log(name);
            var $name=this.refs[name];
            if($name.nodeName.toLowerCase()=='input'){
                if(!$name.value){
                    console.log($name.getAttribute('placeholder'));
                    this.props.init('dialog2',$name.getAttribute('placeholder'),function(){
                        $name.focus();
                    });
                    bool=false;
                    break;
                }
            }
        }
        if(bool){
            if(this.refs['new-pass'].value==this.refs['sure-new-pass'].value){
                var that=this;
                this.props.init('loadToast','加载中',function(obj){
                    console.log(obj);
                    setTimeout(function(){
                        obj.hide();
                        that.props.init('toast','处理成功',function(obj1){
                            setTimeout(function(){
                                obj1.hide();
                            },1500);
                        });
                    },1500);
                });
            }else{
                this.props.init('dialog2','输入新密码不一致，请检查！');
            }
        }
    },
    render: function(){
        return (
            <section id="exit-password" className="ui-container">
                <div className="ui-form ui-border-t">
                    <form ref="form">
                        <div className="ui-form-item ui-border-b">
                            <label>
                                当前密码
                            </label>
                            <input type="password" ref="old-pass" name="filed1" placeholder="请输入当前密码" />
                        </div>
                        <div className="ui-form-item ui-border-b">
                            <label>
                                新密码
                            </label>
                            <input type="password" ref="new-pass" name="filed2" placeholder="密码6-16位，数字/字符/字母至少两种" />
                        </div>
                        <div className="ui-form-item ui-border-b">
                            <label>
                                确认密码
                            </label>
                            <input type="password" ref="sure-new-pass" name="filed3" placeholder="请再次输入新密码" />
                        </div>
                    </form>
                </div>
                <button className="my-button" onClick={this.handleClick}>确认提交</button>
            </section>
        );
    }
});
var Exit_password=React.createClass({
    componentDidMount: function(){
        var that=this;
        setTimeout(function(){
            that.props.init('loadToast','加载中',function(obj){
                obj.hide();
            });
        },500);
    },
    componentWillUnmount: function(){
        this.props.init('loadToast','加载中');
    },
    render: function(){
        return (
            <div>
                <Section_exit_password init={this.props.init} />
            </div>
        );
    }
});

/* 路由 */
var Router=ReactRouter.Router,
    Route=ReactRouter.Route,
    IndexRoute=ReactRouter.IndexRoute;

var NoFound=React.createClass({
    render: function(){
        console.log(this.props);
        return (
            <h1 className="text-center">抱歉找不到相关组件</h1>
        );
    }
});

var Weui=React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    getDefaultProps:function(){
        return {
            title: '加载中',
            callback: function(){},
            dialog2_show: false,
            loadToast_show: true,
            toast_show: false
        }
    },
    getInitialState:function(){
        return {
            title: this.props.title,
            callback: this.props.callback,
            dialog2_show: this.props.dialog2_show,
            loadToast_show: this.props.loadToast_show,
            toast_show: this.props.toast_show
        }
    },
    onChildChanged: function(weui,newValue,callback){
        switch(weui){
            case 'loadToast':
                this.setState({
                    title: newValue,
                    callback: callback,
                    loadToast_show: true
                });
            break;
            case 'dialog2':
                this.setState({
                    content: newValue,
                    callback: callback,
                    dialog2_show: true
                });
            break;
            case 'toast':
                this.setState({
                    title: newValue,
                    callback: callback,
                    toast_show: true
                });
            break;
        }
    },
    dialog2Click: function(e){
        if(this.state.callback) this.state.callback(e);
        this.setState({
            dialog2_show: false
        });
    },
    weui_obj: function(name){
        var that=this;
        switch(name){
            case 'loadToast':
                return {
                    show: function(){
                        that.setState({
                            loadToast_show: true
                        });
                    },
                    hide: function(){
                        that.setState({
                            loadToast_show: false
                        });
                    }
                }
            break;
            case 'toast':
                return {
                    show: function(){
                        that.setState({
                            toast_show: true
                        });
                    },
                    hide: function(){
                        that.setState({
                            toast_show: false
                        });
                    }
                }
            break;
        }
        
    },
    render: function(){
        if(this.state.loadToast_show){
            if(this.state.callback) this.state.callback(this.weui_obj('loadToast'));
        }
        if(this.state.toast_show){
            if(this.state.callback) this.state.callback(this.weui_obj('toast'));
        }
        this.props.children.props.init=this.onChildChanged;
        return (
            <div>
                {this.props.children}
                <div className="weui_loading_toast" style={{'display':this.state.loadToast_show?'block':'none'}}>
                    <div className="weui_mask_transparent"></div>
                    <div className="weui_toast">
                        <div className="weui_loading">
                            <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                            <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                        </div>
                        <p className="weui_toast_content">{this.state.title}</p>
                    </div>
                </div>
                <div className="weui_dialog_alert" style={{'display':this.state.dialog2_show?'block':'none'}}>
                    <div className="weui_mask"></div>
                    <div className="weui_dialog">
                        <div className="weui_dialog_hd">
                            <strong className="weui_dialog_title"></strong>
                        </div>
                        <div className="weui_dialog_bd">{this.state.content}</div>
                        <div className="weui_dialog_ft">
                            <a href="javascript:;"className="weui_btn_dialog primary" onClick={this.dialog2Click}>确定</a>
                        </div>
                    </div>
                </div>
                <div style={{'display':this.state.toast_show?'block':'none'}}>
                    <div className="weui_mask_transparent"></div>
                    <div className="weui_toast">
                        <i className="weui_icon_toast"></i>
                        <p className="weui_toast_content" style={{"font-size": "14px"}}>{this.state.title}</p>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={Weui}>
        <IndexRoute component={Main_personal}/>
        <Route path="myorder" component={My_order} />
        <Route path="membershiplevel" component={Membership_level} />
        <Route path="exitpassword" component={Exit_password} />
    </Route>
    <Route path="*" component={NoFound} />
  </Router>
), document.body);
