export const translateProductName = (
  title: string
): string => {
  if (!title) return "";

  // Thời trang nam
  if (title.includes("Backpack")) {
    return "Ba lô Laptop";
  }

  if (
    title.includes(
      "Premium Slim Fit"
    )
  ) {
    return "Áo thun nam";
  }

  if (
    title.includes(
      "Cotton Jacket"
    )
  ) {
    return "Áo khoác nam";
  }

  if (
    title.includes(
      "Mens Casual Slim Fit"
    )
  ) {
    return "Áo dài tay nam";
  }

  // Trang sức
  if (
    title.includes(
      "John Hardy Women's Legends Naga Gold"
    )
  ) {
    return "Lắc tay nữ";
  }

  if (
    title.includes(
      "Solid Gold"
    )
  ) {
    return "Vòng tay vàng";
  }

  if (
    title.includes(
      "White Gold"
    )
  ) {
    return "Nhẫn nữ";
  }

  if (
    title.includes(
      "Pierced Owl"
    )
  ) {
    return "Khuyên tai nữ";
  }

  // Thời trang nữ
  if (
    title.includes(
      "Opna Women's"
    )
  ) {
    return "Áo thể thao nữ";
  }

  if (
    title.includes(
      "MBJ Women's"
    )
  ) {
    return "Áo nữ cổ tròn";
  }

  if (
    title.includes(
      "DANVOUY"
    )
  ) {
    return "Áo thun nữ";
  }

  if (
    title.includes(
      "Lock and Love"
    )
  ) {
    return "Áo da nữ";
  }

  if (
    title.includes(
      "Rain Jacket"
    )
  ) {
    return "Áo khoác nữ";
  }

  if (
    title.includes(
      "BIYLACLESEN"
    )
  ) {
    return "Áo khoác nữ";
  }

  // Điện tử
  if (
    title.includes(
      "WD 2TB"
    )
  ) {
    return "Ổ cứng WD 2TB";
  }

  if (
    title.includes(
      "SanDisk SSD"
    )
  ) {
    return "SSD SanDisk";
  }

  if (
    title.includes(
      "Silicon Power"
    )
  ) {
    return "SSD Silicon";
  }

  if (
    title.includes(
      "Gaming Drive"
    )
  ) {
    return "Ổ cứng Gaming";
  }

  if (
    title.includes(
      "Acer"
    )
  ) {
    return "Màn hình Acer";
  }

  if (
    title.includes(
      "Samsung"
    )
  ) {
    return "Màn hình Samsung";
  }

  return title;
};

export const translateProduct =
  translateProductName;

export const translateCategory = (
  category: string
): string => {
  switch (
    category?.toLowerCase()
  ) {
    case "men's clothing":
      return "Thời trang nam";

    case "women's clothing":
      return "Thời trang nữ";

    case "electronics":
      return "Điện tử";

    case "jewelery":
    case "jewelry":
      return "Trang sức";

    default:
      return category;
  }
};

export const translateDescription = (
  category: string
): string => {
  switch (
    category?.toLowerCase()
  ) {
    case "men's clothing":
      return "Sản phẩm thời trang nam chất lượng cao, thiết kế hiện đại và phù hợp sử dụng hằng ngày.";

    case "women's clothing":
      return "Sản phẩm thời trang nữ với kiểu dáng trẻ trung, chất liệu mềm mại và thoải mái.";

    case "electronics":
      return "Thiết bị điện tử chính hãng với hiệu năng ổn định và độ bền cao.";

    case "jewelery":
    case "jewelry":
      return "Trang sức cao cấp với thiết kế tinh xảo, sang trọng và nổi bật.";

    default:
      return "Sản phẩm chất lượng cao.";
  }
};