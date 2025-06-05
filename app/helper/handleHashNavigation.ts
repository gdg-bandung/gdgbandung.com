export default function handleHashNavigation(href: string) {
  if (href.startsWith("/#")) {
    const element = document.querySelector(href.substring(1));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: href.includes("#contact") ? "center" : "start",
      });
    }
  }
}
