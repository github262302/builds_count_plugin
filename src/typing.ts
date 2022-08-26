export interface query {
    /**内容摘要*/
    cotent: string;
    /**邮件账户名*/
    email: string;
    /**覆盖默认请求函数*/
    fn?: () => Promise<void>;
}
