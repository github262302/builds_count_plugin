import nodefetch from "node-fetch";
import webpack from "webpack";
import { query } from "./typing";
const address = "http://demo.vimjs.com:10006/api/builds/create?";
const PluginName = "BuildsWebpackPlugin";
/**
 * 插件-打包完请求
 * @see http://demo.vimjs.com:10006
 * */
class BuildsWebpackPlugin {
    email: string;
    content: string;
    fn: () => Promise<void>;
    constructor(param: query) {
        this.content = param.cotent;
        this.email = param.email;
        this.fn = param.fn;
    }
    apply(compiler: webpack.Compiler) {
        compiler.hooks.done.tapAsync(PluginName, async a => {
            if (this.fn) {
                await this.fn();
                return;
            }
            await nodefetch(
                ` ${address}email=${this.email}&content=${this.content}`
            )
                .then(res => res.text())
                .then(res => console.log(res));
        });
    }
}
export { BuildsWebpackPlugin, query };
