import React from "react";
import styles from "./AboutUsPage.module.css";

export default function AboutUsPage() {
  const toggleMobileMenu = () => {
    const navMenu = document.querySelector(`.${styles.navMenu}`);
    navMenu.classList.toggle(styles.active);
  };

  const handleMenuItemClick = () => {
    const navMenu = document.querySelector(`.${styles.navMenu}`);
    navMenu.classList.remove(styles.active);
  };

  React.useEffect(() => {
    const navLinks = document.querySelectorAll(`.${styles.navList} a`);
    navLinks.forEach((link) => {
      link.addEventListener("click", handleMenuItemClick);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleMenuItemClick);
      });
    };
  }, []);
  return (
    <>
      <section className={styles.pageTitle}>
        <div className={styles.container}>
          <h1>Về Chúng Tôi</h1>
          <div className={styles.breadcrumb}>
            <a href="index.html">Trang chủ</a> &gt; <span>Về chúng tôi</span>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <img
                src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e"
                alt="Nhà hàng RETASTE"
              />
            </div>
            <div className={styles.aboutText}>
              <h2>Câu chuyện của chúng tôi</h2>
              <p>
                RETASTE được thành lập vào năm 2020 với mục tiêu mang đến cho
                người dùng một trải nghiệm ẩm thực mới mẻ và cá nhân hóa. Chúng
                tôi tin rằng mỗi người đều có khẩu vị riêng biệt, và xứng đáng
                được thưởng thức những món ăn phù hợp nhất.
              </p>
              <p>
                Với đội ngũ gồm các chuyên gia ẩm thực hàng đầu kết hợp cùng các
                kỹ sư công nghệ, RETASTE đã phát triển một nền tảng độc đáo giúp
                gợi ý món ăn phù hợp dựa trên sở thích cá nhân của từng khách
                hàng.
              </p>
              <p>
                Từ một ý tưởng đơn giản, chúng tôi đã phát triển thành một trong
                những dịch vụ giao đồ ăn phổ biến nhất tại Việt Nam, phục vụ
                hàng ngàn khách hàng mỗi ngày. RETASTE không chỉ là một dịch vụ
                giao đồ ăn, mà còn là người bạn đồng hành trong hành trình khám
                phá ẩm thực của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.missionVision}>
        <div className={styles.container}>
          <div className={styles.mvContainer}>
            <div className={styles.mission}>
              <h2>Sứ mệnh</h2>
              <p>
                Sứ mệnh của RETASTE là mang đến cho khách hàng những trải nghiệm
                ẩm thực phù hợp nhất với sở thích cá nhân, thông qua công nghệ
                gợi ý thông minh và dịch vụ chất lượng cao.
              </p>
              <p>
                Chúng tôi cam kết cung cấp những món ăn ngon, an toàn vệ sinh,
                được chế biến bởi những đầu bếp tài năng, và được giao đến tận
                tay khách hàng trong thời gian nhanh nhất có thể.
              </p>
            </div>
            <div className={styles.vision}>
              <h2>Tầm nhìn</h2>
              <p>
                RETASTE hướng đến việc trở thành nền tảng gợi ý và giao đồ ăn
                hàng đầu tại Việt Nam và trong khu vực Đông Nam Á. Chúng tôi
                không ngừng cải tiến công nghệ, mở rộng danh mục món ăn, và nâng
                cao chất lượng dịch vụ.
              </p>
              <p>
                Chúng tôi tin rằng trong tương lai, việc tìm kiếm và thưởng thức
                những món ăn phù hợp sẽ trở nên dễ dàng hơn bao giờ hết, và
                RETASTE sẽ luôn đi đầu trong lĩnh vực này.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className={styles.ourStory}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Hành trình phát triển</h2>
          <div className={styles.timeline}>
            <div className={`${styles.timelineItem} ${styles.timelineLeft}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2020</div>
                <h3 className={styles.timelineTitle}>Khởi đầu</h3>
                <p>
                  RETASTE được thành lập bởi hai người bạn đam mê ẩm thực và
                  công nghệ. Phiên bản đầu tiên của ứng dụng được ra mắt tại
                  TP.HCM.
                </p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelineRight}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2021</div>
                <h3 className={styles.timelineTitle}>Mở rộng thị trường</h3>
                <p>
                  RETASTE mở rộng dịch vụ đến Hà Nội và Đà Nẵng. Số lượng đối
                  tác nhà hàng tăng lên 500+.
                </p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelineLeft}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2022</div>
                <h3 className={styles.timelineTitle}>Phát triển công nghệ</h3>
                <p>
                  Ra mắt thuật toán gợi ý thông minh phiên bản 2.0, giúp tăng độ
                  chính xác trong việc gợi ý món ăn cho khách hàng.
                </p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelineRight}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2023</div>
                <h3 className={styles.timelineTitle}>Gọi vốn thành công</h3>
                <p>
                  RETASTE gọi vốn thành công 5 triệu USD từ các nhà đầu tư hàng
                  đầu trong lĩnh vực công nghệ và F&B.
                </p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelineLeft}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2024</div>
                <h3 className={styles.timelineTitle}>Đạt 1 triệu người dùng</h3>
                <p>
                  RETASTE chạm mốc 1 triệu người dùng tích cực, trở thành một
                  trong những ứng dụng giao đồ ăn phổ biến nhất tại Việt Nam.
                </p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelineRight}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2025</div>
                <h3 className={styles.timelineTitle}>Mở rộng khu vực</h3>
                <p>
                  RETASTE bắt đầu mở rộng hoạt động sang các quốc gia khác trong
                  khu vực Đông Nam Á, bắt đầu với Thái Lan và Singapore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Đội ngũ của chúng tôi</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Nguyễn Văn An"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>Nguyễn Văn An</h3>
                <div className={styles.teamPosition}>Đồng sáng lập & CEO</div>
                <p className={styles.teamBio}>
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ, Anh là
                  người đưa ra tầm nhìn và chiến lược phát triển cho RETASTE.
                </p>
                <div className={styles.teamSocial}>
                  <a href="#" title="LinkedIn">
                    🔗
                  </a>
                  <a href="#" title="Twitter">
                    🐦
                  </a>
                  <a href="#" title="Email">
                    ✉️
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.teamMember}>
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Trần Thị Mai"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>Trần Thị Mai</h3>
                <div className={styles.teamPosition}>Đồng sáng lập & COO</div>
                <p className={styles.teamBio}>
                  Chuyên gia ẩm thực với bằng Thạc sĩ từ Le Cordon Bleu, Mai phụ
                  trách mảng vận hành và phát triển danh mục món ăn.
                </p>
                <div className={styles.teamSocial}>
                  <a href="#" title="LinkedIn">
                    🔗
                  </a>
                  <a href="#" title="Twitter">
                    🐦
                  </a>
                  <a href="#" title="Email">
                    ✉️
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.teamMember}>
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Lê Minh Đức"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>Lê Minh Đức</h3>
                <div className={styles.teamPosition}>CTO</div>
                <p className={styles.teamBio}>
                  Chuyên gia AI và Machine Learning, Đức là người đứng sau thuật
                  toán gợi ý thông minh của RETASTE.
                </p>
                <div className={styles.teamSocial}>
                  <a href="#" title="LinkedIn">
                    🔗
                  </a>
                  <a href="#" title="Twitter">
                    🐦
                  </a>
                  <a href="#" title="Email">
                    ✉️
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.teamMember}>
              <img
                src="https://randomuser.me/api/portraits/women/63.jpg"
                alt="Phạm Thanh Hà"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>Phạm Thanh Hà</h3>
                <div className={styles.teamPosition}>CMO</div>
                <p className={styles.teamBio}>
                  Với hơn 8 năm kinh nghiệm trong lĩnh vực marketing, Hà phụ
                  trách chiến lược xây dựng thương hiệu và phát triển thị
                  trường.
                </p>
                <div className={styles.teamSocial}>
                  <a href="#" title="LinkedIn">
                    🔗
                  </a>
                  <a href="#" title="Twitter">
                    🐦
                  </a>
                  <a href="#" title="Email">
                    ✉️
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Giá trị cốt lõi</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3 className={styles.valueTitle}>Cá nhân hóa</h3>
              <p className={styles.valueDescription}>
                Chúng tôi tin rằng mỗi khách hàng đều có khẩu vị riêng biệt và
                xứng đáng được phục vụ theo cách phù hợp nhất.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>⚡</div>
              <h3 className={styles.valueTitle}>Hiệu quả</h3>
              <p className={styles.valueDescription}>
                Không ngừng cải tiến quy trình để mang đến dịch vụ nhanh chóng
                và chất lượng nhất cho khách hàng.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>♻️</div>
              <h3 className={styles.valueTitle}>Bền vững</h3>
              <p className={styles.valueDescription}>
                Cam kết sử dụng bao bì thân thiện với môi trường và hỗ trợ các
                đối tác có cùng chí hướng.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔍</div>
              <h3 className={styles.valueTitle}>Minh bạch</h3>
              <p className={styles.valueDescription}>
                Luôn rõ ràng về nguồn gốc nguyên liệu, quy trình chế biến và giá
                cả dịch vụ.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌱</div>
              <h3 className={styles.valueTitle}>Đổi mới</h3>
              <p className={styles.valueDescription}>
                Không ngừng tìm kiếm những giải pháp mới để cải thiện trải
                nghiệm của khách hàng.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3 className={styles.valueTitle}>Cộng tác</h3>
              <p className={styles.valueDescription}>
                Xây dựng mối quan hệ bền vững với các đối tác, nhà cung cấp và
                cộng đồng địa phương.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Đối tác của chúng tôi</h2>
          <div className={styles.partnersGrid}>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍔 FastFood</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍕 PizzaHub</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍣 SushiGo</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>☕ CoffeeTime</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍦 IceCreamLand</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍜 NoodleHouse</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🥗 HealthyBowl</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.partnerLogo}>🍰 SweetCakes</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Hãy kết nối với chúng tôi</h2>
          <p className={styles.ctaDescription}>
            Bạn có thắc mắc hoặc đề xuất? Đừng ngần ngại liên hệ với đội ngũ của
            RETASTE. Chúng tôi luôn sẵn sàng lắng nghe và phản hồi nhanh chóng.
          </p>
          <a href="#" className={styles.ctaButton}>
            Liên hệ ngay
          </a>
        </div>
      </section>
    </>
  );
}
