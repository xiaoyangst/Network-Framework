cmake_minimum_required(VERSION 3.16)
project(xrtcserver)

set(CMAKE_CXX_STANDARD 11)

add_definitions("-g -pipe -W -Wall -fPIC -std=gnu++14 -DWEBRTC_POSIX -DWEBRTC_LINUX")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/bin)

#在链接阶段指定库文件的搜索路径
link_directories(third_party/lib)

#头文件搜索路径
include_directories(third_party/include)

#源文件搜索路径
aux_source_directory(src/base BASE_SRC)
aux_source_directory(src/server SERVER_SRC)

add_executable(xrtcserver main.cpp ${BASE_SRC} ${SERVER_SRC})

target_link_libraries(xrtcserver libyaml-cpp.a)

