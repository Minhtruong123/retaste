import React from "react";
import {
  Copy,
  Search,
  ShoppingCart,
  User,
  Menu,
  Calendar,
  Clock,
} from "lucide-react";

export default function PromotionPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [activePage, setActivePage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filters = [
    "Tất cả",
    "Miễn phí giao hàng",
    "Giảm giá món",
    "Combo tiết kiệm",
    "Ưu đãi đặc biệt",
  ];

  const promotions = [
    {
      id: 1,
      title: "Miễn phí giao hàng",
      description:
        "Miễn phí giao hàng cho tất cả đơn hàng từ 150.000đ trong khu vực nội thành.",
      discount: "Miễn phí",
      expiry: "31/12/2025",
      usage: "1.2k+",
      code: "FREESHIP150K",
      image: "https://images.unsplash.com/photo-1626203050124-483ea5c30968",
    },
    {
      id: 2,
      title: "Ưu đãi cuối tuần",
      description:
        "Giảm 30% cho tất cả các món ăn vào thứ 7 và Chủ nhật. Áp dụng cho đơn hàng từ 200.000đ.",
      discount: "-30%",
      expiry: "30/11/2025",
      usage: "3.5k+",
      code: "WEEKEND30",
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b",
    },
    {
      id: 3,
      title: "Combo gia đình",
      description:
        "Tiết kiệm 25% khi đặt combo gia đình gồm 4 món chính, 2 món tráng miệng và 4 đồ uống.",
      discount: "-25%",
      expiry: "15/12/2025",
      usage: "2.8k+",
      code: "FAMILY25",
      image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6",
    },
    {
      id: 4,
      title: "Ưu đãi bữa trưa",
      description:
        "Giảm 20% cho tất cả đơn hàng từ 11:00 - 14:00 từ thứ 2 đến thứ 6. Áp dụng cho đơn hàng từ 100.000đ.",
      discount: "-20%",
      expiry: "31/01/2026",
      usage: "5k+",
      code: "LUNCH20",
      image: "https://images.unsplash.com/photo-1593504049359-74330189a345",
    },
    {
      id: 5,
      title: "Ưu đãi sinh nhật",
      description:
        "Mừng sinh nhật của bạn với ưu đãi giảm 40% cho đơn hàng trong ngày sinh nhật. Yêu cầu xác minh ngày sinh.",
      discount: "-40%",
      expiry: "Quanh năm",
      usage: "9.2k+",
      code: "BIRTHDAY40",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    },
    {
      id: 6,
      title: "Ưu đãi người dùng app mới",
      description:
        "Tải ứng dụng RETASTE và nhận ưu đãi 35% cho 3 đơn hàng đầu tiên đặt qua ứng dụng.",
      discount: "-35%",
      expiry: "31/12/2025",
      usage: "7.8k+",
      code: "NEWAPP35",
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43",
    },
  ];

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Đã sao chép mã: " + code);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <a href="#" className="text-2xl font-bold text-orange-500">
                RE<span className="text-teal-600">TASTE</span>
              </a>

              <button
                className="lg:hidden text-orange-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>

              <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm món ăn, thức uống..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:border-orange-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500">
                  <Search size={20} />
                </button>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <a href="#" className="relative text-gray-700">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </a>
                <a href="#" className="text-gray-700">
                  <User size={24} />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } lg:block bg-teal-600`}
          >
            <div className="max-w-6xl mx-auto px-4">
              <nav className="py-3">
                <ul className="flex flex-col lg:flex-row lg:justify-center gap-6 text-white">
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Thực đơn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Món được gợi ý
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Combo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="border-b-2 border-white pb-1">
                      Khuyến mãi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Về chúng tôi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-200">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Banner */}
        <section
          className="relative bg-cover bg-center text-white py-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ưu Đãi & Khuyến Mãi
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Khám phá các ưu đãi hấp dẫn từ RETASTE. Tiết kiệm hơn khi thưởng
              thức những món ăn yêu thích.
            </p>
          </div>
        </section>

        {/* Promotion Filters */}
        <div className="bg-white shadow-md py-5 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Promotion */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div
                className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1563729784474-d77dbb933a9e)",
                }}
              ></div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm mb-4 w-fit">
                  Ưu đãi đặc biệt
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Giảm 50% cho đơn hàng đầu tiên
                </h2>
                <p className="text-gray-600 mb-6">
                  Đặt món lần đầu tiên tại RETASTE và nhận ưu đãi giảm 50% (tối
                  đa 100.000đ) cho đơn hàng đầu tiên của bạn. Áp dụng cho tất cả
                  các món ăn và thức uống.
                </p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors w-fit">
                  Đặt món ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions List */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Tất cả khuyến mãi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-orange-500 text-white font-bold px-3 py-1 rounded text-lg">
                      {promo.discount}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3">{promo.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {promo.description}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Hết hạn: {promo.expiry}</span>
                      </div>
                      <div>Đã sử dụng: {promo.usage}</div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded mb-4">
                      <span className="font-bold tracking-wider">
                        {promo.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(promo.code)}
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors flex items-center gap-2"
                      >
                        <Copy size={16} />
                        Sao chép
                      </button>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded font-medium hover:bg-orange-600 transition-colors">
                      Sử dụng ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${
                    activePage === page
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded border bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 flex items-center justify-center">
                &gt;
              </button>
            </div>
          </div>
        </section>

        <section className="bg-teal-600 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Đừng bỏ lỡ ưu đãi mới!</h2>
            <p className="text-xl mb-8">
              Đăng ký để nhận thông báo về các khuyến mãi mới và ưu đãi đặc
              biệt.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded text-gray-800 outline-none"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded font-medium hover:bg-orange-600 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
