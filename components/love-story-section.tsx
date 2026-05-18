'use client';

export function LoveStorySection() {
  return (
    <section className="w-full py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Khoảnh khắc đặc biệt
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-8">
            Câu chuyện của chúng tôi
          </h2>
        </div>

        {/* Story content */}
        <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12">
          {/* Decorative opening */}
          <div className="flex justify-center mb-8">
            <span className="text-4xl text-primary/20">"</span>
          </div>

          {/* Story text */}
          <p className="text-center text-lg text-muted-foreground leading-relaxed mb-8 font-light">
            Giữa những điều bình dị của cuộc sống, chúng tôi đã tìm thấy nhau, cùng nhau trưởng thành, sẻ chia và yêu thương. 
            <br />
            <br />
            Hành trình tìm kiếm người nửa kia không luôn dễ dàng, nhưng khi gặp được đúng người, tất cả đều trở nên có ý nghĩa. 
            Chúng tôi tin rằng tình yêu là sự cộng hưởng của hai con tim, là những lời thì thầm lúc bình minh, và là những nụ cười khi lâm vào khó khăn.
            <br />
            <br />
            Ngày hôm nay, chúng tôi mong được có gia đình, bạn bè và những người thân yêu cùng hiện diện để chứng kiến khoảnh khắc đặc biệt này. 
            Hãy cùng chúng tôi chia sẻ niềm vui, cười cùng lúc vui vẻ, và viết tiếp câu chuyện yêu thương của chúng tôi.
          </p>

          {/* Decorative closing */}
          <div className="flex justify-center">
            <span className="text-4xl text-primary/20">„</span>
          </div>

          {/* Signature area */}
          <div className="mt-12 pt-8 border-t border-secondary/20 text-center">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-playfair text-2xl font-bold text-primary">
                  Lê Phúc Tường
                </p>
              </div>
              <div>
                <p className="font-playfair text-2xl font-bold text-primary">
                  Nguyễn Ngọc Anh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
