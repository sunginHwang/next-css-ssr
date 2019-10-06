import Document, {Head, Main, NextScript} from 'next/document';
import {readFileSync} from 'fs';
import {join} from 'path';

class NextHeadWithInlineCss extends Head {

    getInlineCss() {
        const {files} = this.context._documentProps;
        if (!files || files.length === 0) return null; // 파일이 없으면 작업 완료.

        return files.filter(file => /\.css$/.test(file))  // css 파일만 사용
                    .map(file => (
                        <style key={file} dangerouslySetInnerHTML={{
                                   __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'), // .next 경로부터 읽어오기 위함.
                               }}
                        />
            ));
    }

    render() {
        return this.getInlineCss(); // 읽어온 스타일 태그 리턴
    }
}

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <html>
            <NextHeadWithInlineCss/>
            <body>
            <Main/> {/* 라우트에 해당하는 페이지 렌더링 */}
            <NextScript/> {/* Next.js 관련 js 파일 */}
            </body>
            </html>
        );
    }
}

export default MyDocument;