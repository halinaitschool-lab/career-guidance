<script>
  (function () {
    const isLocal = window.location.hostname === 'localhost' 
                || window.location.hostname === '127.0.0.1';

    const base = isLocal ? '/' : '/career-guidance/';

    const baseTag = document.createElement('base');
    baseTag.href = base;
    document.head.prepend(baseTag);
  })();
</script>
