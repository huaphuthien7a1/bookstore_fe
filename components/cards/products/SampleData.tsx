const sampleData = [
  {
    id: 0,
    name: 'Gatsby Vĩ Đại',
    description:
      'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '30000',
    rating: 4.5,
  },
  {
    id: 1,
    name: 'Không Gia Đình (Bìa Cứng)',
    description:
      'Không gia đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '130000',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Nhà Thờ Đức Bà Paris (Bìa Cứng) (Tái Bản 2021)',
    description:
      'Nhà thờ Đức Bà Paris là tác phẩm tiêu biểu cho phong cách sáng tác theo khuynh hướng lãng mạn của Victor Hugo. Cũng nhờ thành công của tác phẩm mà ông được biết đến như một nhà văn nhân đạo, lãng mạn bậc nhất của nước Pháp. Bằng cốt truyện khá bi thảm, nặng nề, các tình tiết xếp đặt khéo léo, mang kịch tính và hình ảnh tô đậm, phóng đại, lẫn lộn thực hư, kết hợp với bút pháp miêu tả thật rực rỡ, kỳ thú, Victor Hugo đã vẽ nên một bức tranh thu nhỏ về xã hội Pháp thế kỷ XV.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '142000',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Những Ngày Thơ Ấu (Tái Bản 2019)',
    description:
      'Những Ngày Thơ Ấu "Những ngày thơ ấu có thể coi là một phẩm xuất sắc. Đây là tập hồi ký về tuổi thơ ghi lại những rung động cực điểm của một linh hồn trẻ dại" - Thạch Lam "Một nghệ sĩ đã thực hiện hết mình, đã mang được vào sự nghiệp sáng tác hết tất cả những cái đáng giá nhất mà mình muốn nói với người đời, là một người sung sướng nhất… Nguyên Hồng là nhà văn đã có cái hạnh phúc tuyệt vời ấy"',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '34000',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Ba Tước Monte Cristo',
    description:
      'Sắp được giao trọng trách làm một thuyền trưởng, chuẩn bị cưới nàng Mercédès xinh đẹp dịu dàng, có một người cha hết mực thương yêu, được anh em bè bạn mến phục, tương lai của chàng thanh niên Edmond Dantès thật rạng ngời hạnh phúc. Nhưng số mệnh nghiệt ngã, vẽ nên viễn cảnh tươi sáng để rồi bôi đen tất cả. Đúng trong ngày hạnh phúc nhất đời, anh bị bắt giam vào hầm ngục lâu đài khi chưa đầy hai mươi tuổi bởi âm mưu của những kẻ ghen ghét, đố kị và cơ hội.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '45000',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Gatsby Vĩ Đại',
    description:
      'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '30000',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Không Gia Đình (Bìa Cứng)',
    description:
      'Không gia đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '130000',
    rating: 4.5,
  },
  {
    id: 7,
    name: 'Nhà Thờ Đức Bà Paris (Bìa Cứng) (Tái Bản 2021)',
    description:
      'Nhà thờ Đức Bà Paris là tác phẩm tiêu biểu cho phong cách sáng tác theo khuynh hướng lãng mạn của Victor Hugo. Cũng nhờ thành công của tác phẩm mà ông được biết đến như một nhà văn nhân đạo, lãng mạn bậc nhất của nước Pháp. Bằng cốt truyện khá bi thảm, nặng nề, các tình tiết xếp đặt khéo léo, mang kịch tính và hình ảnh tô đậm, phóng đại, lẫn lộn thực hư, kết hợp với bút pháp miêu tả thật rực rỡ, kỳ thú, Victor Hugo đã vẽ nên một bức tranh thu nhỏ về xã hội Pháp thế kỷ XV.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '142000',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Những Ngày Thơ Ấu (Tái Bản 2019)',
    description:
      'Những Ngày Thơ Ấu "Những ngày thơ ấu có thể coi là một phẩm xuất sắc. Đây là tập hồi ký về tuổi thơ ghi lại những rung động cực điểm của một linh hồn trẻ dại" - Thạch Lam "Một nghệ sĩ đã thực hiện hết mình, đã mang được vào sự nghiệp sáng tác hết tất cả những cái đáng giá nhất mà mình muốn nói với người đời, là một người sung sướng nhất… Nguyên Hồng là nhà văn đã có cái hạnh phúc tuyệt vời ấy"',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '34000',
    rating: 4.5,
  },
  {
    id: 9,
    name: 'Ba Tước Monte Cristo',
    description:
      'Sắp được giao trọng trách làm một thuyền trưởng, chuẩn bị cưới nàng Mercédès xinh đẹp dịu dàng, có một người cha hết mực thương yêu, được anh em bè bạn mến phục, tương lai của chàng thanh niên Edmond Dantès thật rạng ngời hạnh phúc. Nhưng số mệnh nghiệt ngã, vẽ nên viễn cảnh tươi sáng để rồi bôi đen tất cả. Đúng trong ngày hạnh phúc nhất đời, anh bị bắt giam vào hầm ngục lâu đài khi chưa đầy hai mươi tuổi bởi âm mưu của những kẻ ghen ghét, đố kị và cơ hội.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '45000',
    rating: 4.5,
  },
  {
    id: 10,
    name: 'Gatsby Vĩ Đại',
    description:
      'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '30000',
    rating: 4.5,
  },
  {
    id: 11,
    name: 'Không Gia Đình (Bìa Cứng)',
    description:
      'Không gia đình là tiểu thuyết nổi tiếng nhất trong sự nghiệp văn chương của Hector Malot. Hơn một trăm năm nay, tác phẩm giành giải thưởng của Viện Hàn Lâm Văn học Pháp này đã trở thành người bạn thân thiết của thiếu nhi và tất cả những người yêu mến trẻ khắp thế giới.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '130000',
    rating: 4.5,
  },
  {
    id: 12,
    name: 'Nhà Thờ Đức Bà Paris (Bìa Cứng) (Tái Bản 2021)',
    description:
      'Nhà thờ Đức Bà Paris là tác phẩm tiêu biểu cho phong cách sáng tác theo khuynh hướng lãng mạn của Victor Hugo. Cũng nhờ thành công của tác phẩm mà ông được biết đến như một nhà văn nhân đạo, lãng mạn bậc nhất của nước Pháp. Bằng cốt truyện khá bi thảm, nặng nề, các tình tiết xếp đặt khéo léo, mang kịch tính và hình ảnh tô đậm, phóng đại, lẫn lộn thực hư, kết hợp với bút pháp miêu tả thật rực rỡ, kỳ thú, Victor Hugo đã vẽ nên một bức tranh thu nhỏ về xã hội Pháp thế kỷ XV.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '142000',
    rating: 4.5,
  },
  {
    id: 13,
    name: 'Những Ngày Thơ Ấu (Tái Bản 2019)',
    description:
      'Những Ngày Thơ Ấu "Những ngày thơ ấu có thể coi là một phẩm xuất sắc. Đây là tập hồi ký về tuổi thơ ghi lại những rung động cực điểm của một linh hồn trẻ dại" - Thạch Lam "Một nghệ sĩ đã thực hiện hết mình, đã mang được vào sự nghiệp sáng tác hết tất cả những cái đáng giá nhất mà mình muốn nói với người đời, là một người sung sướng nhất… Nguyên Hồng là nhà văn đã có cái hạnh phúc tuyệt vời ấy"',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '34000',
    rating: 4.5,
  },
  {
    id: 14,
    name: 'Ba Tước Monte Cristo',
    description:
      'Sắp được giao trọng trách làm một thuyền trưởng, chuẩn bị cưới nàng Mercédès xinh đẹp dịu dàng, có một người cha hết mực thương yêu, được anh em bè bạn mến phục, tương lai của chàng thanh niên Edmond Dantès thật rạng ngời hạnh phúc. Nhưng số mệnh nghiệt ngã, vẽ nên viễn cảnh tươi sáng để rồi bôi đen tất cả. Đúng trong ngày hạnh phúc nhất đời, anh bị bắt giam vào hầm ngục lâu đài khi chưa đầy hai mươi tuổi bởi âm mưu của những kẻ ghen ghét, đố kị và cơ hội.',
    image:
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg',
    price: '45000',
    rating: 4.5,
  },
];
export default sampleData;