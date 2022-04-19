## Desc

mediawiki를 docker로 활용하기 위한 이미지.

Apache2.conf를 설정해 shorten URL을 변경할 수 도 있다.

## LocalSettings.php

`LocalSettings.php` 파일은 mediawiki의 전체적인 설정을 관리하는 파일이다. 해당 파일에는 여러 서버 및 개인정보가 들어 있어 여기에는 포함시키지 않고 일부 설정들만 공유 한다.


```php

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
#$wgScriptPath = "";

$wgScriptPath = "";
$wgArticlePath = "/$1";

###
### https://www.mediawiki.org/wiki/Manual:Preventing_access
###

# Disable reading by anonymous users
#$wgGroupPermissions['*']['read'] = false;

# Disable anonymous editing
$wgGroupPermissions['*']['edit'] = false;

# Prevent new user registrations except by sysops
#$wgGroupPermissions['*']['createaccount'] = false;


###
### https://www.mediawiki.org/wiki/Extension:Cite
###
wfLoadExtension( 'Cite' );

```